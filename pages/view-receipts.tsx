import { Receipt } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import { deleteReceipt, getReceiptsView } from "../utils/function/api/receipt";
import CategoryPill from "../components/UI/category-pill/CategoryPill";
import {
  formatCurrencyNumberText,
  weekday,
} from "../components/pages/dashboard/Receipt";
import { PATHS } from "../utils/constants";
import { IconPenToSquare } from "../components/icons/PenToSquare";
import { IconTrashCan } from "../components/icons/TrashCan";
import { IconEye } from "../components/icons/Eye";
import Link from "next/link";
import classNames from "classnames";
import { ReceiptQueryResultItem } from "../server/repository/receipt";
import Backdrop from "../components/UI/backdrop/Backdrop";
import ViewReceipt from "../components/modal/ViewReceipt";
import { useAtom } from "jotai";
import { viewReceiptAtom } from "../store/atoms";
import Modal from "../components/UI/modal/Modal";
import { toast } from "react-toastify";
import { getResponseErrorMessage } from "../utils/function/common";

function ViewReceiptsPage() {
  const [receipts, setReceipts] = useState<ReceiptQueryResultItem[]>([]);
  const [viewReceiptId, setViewReceiptId] = useAtom(viewReceiptAtom);

  // function showReceipt(receiptId: number) {
  //   setModalReceiptId(receiptId);
  // }

  // function closeReceiptModal() {
  //   setModalReceiptId(undefined);
  // }

  useEffect(() => {
    async function fetchReceipts() {
      try {
        const data = await getReceiptsView();
        setReceipts(data.items);
      } catch (error) {}
    }

    fetchReceipts();
  }, []);

  function getCellClassname(cellId: string) {
    if (cellId === "category") return classNames("w-[128px]");
    if (cellId === "date") return classNames("w-[128px]");
    if (cellId === "icons") return classNames("w-[128px]");
    if (cellId === "total") return classNames("w-[128px]");
    return "";
  }

  const columns = useMemo(() => {
    return [
      {
        id: "category",
        Header: "Category",
        accessor: (receipt) => receipt,
        Cell: ({ cell: { value } }) => {
          return (
            <CategoryPill
              mainColor={value.mostSpentCategory.color}
              iconName={value.mostSpentCategory.icon}
            >
              {value.mostSpentCategory.name}
            </CategoryPill>
          );
        },
      },
      {
        Header: "Address",
        accessor: (receipt) => receipt.marketplace.address,
      },
      {
        id: "date",
        Header: "Date",
        accessor: "date",
        Cell: ({ cell: { value } }) => (
          <div>
            {weekday[new Date(value).getDay()]},{" "}
            {new Date(value).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        ),
      },
      {
        id: "total",
        Header: "Total",
        accessor: (receipt) => receipt,
        Cell: ({ cell: { value } }) => {
          return (
            <div className="text-[#660000] text-left">
              {formatCurrencyNumberText(value.total, value.currency.code)}{" "}
              {value.currency.code}
            </div>
          );
        },
      },
      {
        id: "icons",
        accessor: (receipt) => receipt,
        Cell: ({ cell: { value } }) => {
          return (
            <div className={classNames("flex justify-end items-center")}>
              <span
                onClick={() => {
                  console.log(value.id);
                  setViewReceiptId(value.id);
                }}
                className={classNames(
                  "p-[6px]",
                  "transition-colors cursor-pointer rounded-[50%]",
                  "hover:bg-[#90c3d0] hover:text-[grey]"
                )}
              >
                <IconEye className={classNames("w-[20px] h-[20px]")} />
              </span>
              <Link href={PATHS.EDIT_RECEIPTS + "/" + value.id}>
                <a
                  className={classNames(
                    "p-[6px]",
                    "transition-colors cursor-pointer rounded-[50%]",
                    "hover:bg-[#90c3d0] hover:text-[grey]"
                  )}
                >
                  <IconPenToSquare
                    className={classNames("w-[20px] h-[20px]")}
                  />
                </a>
              </Link>
              <span
                className={classNames(
                  "p-[6px]",
                  "transition-colors cursor-pointer rounded-[50%]",
                  "hover:bg-[#90c3d0] hover:text-[grey]"
                )}
                onClick={() => {
                  (async function () {
                    try {
                      await deleteReceipt(value.id);
                      handleDelete(value.id);
                      toast.success("Receipt deleted");
                    } catch (error) {
                      console.log(error);
                      toast.error(getResponseErrorMessage(error));
                    }
                  })();
                }}
              >
                <IconTrashCan className={classNames("w-[20px] h-[20px]")} />
              </span>
            </div>
          );
        },
      },
    ] as Column<ReceiptQueryResultItem>[];
  }, []);
  const data = useMemo(() => receipts, [receipts]);

  function handleDelete(receiptId: number) {
    setReceipts((prevReceipts) =>
      prevReceipts.filter((receipt) => receipt.id !== receiptId)
    );
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div>
      <table
        {...getTableProps({
          className: classNames("border-spacing-[4px] border-separate"),
        })}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps({
                className: classNames("text-left"),
              })}
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps({ className: classNames("text-xs") })}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps({
                        className: getCellClassname(cell.column.id),
                      })}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {viewReceiptId !== undefined && (
        <Backdrop
          onCancel={() => {
            setViewReceiptId(undefined);
          }}
        />
      )}
      {viewReceiptId !== undefined && (
        <Modal>
          <ViewReceipt onDelete={handleDelete} />
        </Modal>
      )}
    </div>
  );
}

export default ViewReceiptsPage;
