import { Receipt } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import { getReceiptsView } from "../utils/function/api/receipt";
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
import { Modal } from "antd";

function ViewReceiptsPage() {
  const [receipts, setReceipts] = useState<ReceiptQueryResultItem[]>([]);
  const [modalReceiptId, setModalReceiptId] = useState<number>();

  console.log(modalReceiptId)

  function showReceipt(receiptId: number) {
    setModalReceiptId(receiptId);
  }

  function closeReceiptModal() {
    setModalReceiptId(undefined);
  }

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
    if(cellId === "category") return classNames("w-[128px]")
    if(cellId === "date") return classNames("w-[128px]")
    if(cellId === "icons") return classNames("w-[128px]")
    if(cellId === "total") return classNames("w-[128px]")
    return "";
  }

  const columns = useMemo(() => {
    return [
      {
        id:"category",
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
        id:"date",
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
        id:"total",
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
              onClick={() => showReceipt(value.id)}
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  return (
    <div>
      <table {...getTableProps({className:classNames("border-spacing-[4px] border-separate")})}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps({className:classNames("text-left")})}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps({className:classNames("text-xs")})}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps({
                      className: getCellClassname(cell.column.id)
                    })}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        modalReceiptId !== undefined &&
        <Modal open={true} onCancel={closeReceiptModal}>
          {modalReceiptId}
        </Modal>
      }
    </div>
  );
}

export default ViewReceiptsPage;
