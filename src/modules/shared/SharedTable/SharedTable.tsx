import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useCallback, memo } from "react";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(() => ({
  fontFamily: "Inter, sans-serif",
  padding: "16px 20px",
  borderBottom: "1px solid #E5E7EB",
  [`&.head`]: {
    color: "#374151",
    fontWeight: "600",
    fontSize: "12px",
    backgroundColor: "#E2E5EB",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  [`&.body`]: {
    fontWeight: "400",
    color: "#111827",
    fontSize: "14px",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ffffff",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#F9FAFB",
  },
  "&:hover": {
    backgroundColor: "#F3F4F6 !important",
  },
}));

const StyledTableContainer = styled(TableContainer)(() => ({
  border: "1px solid #E5E7EB",
  borderRadius: "8px",
  boxShadow:
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  backgroundColor: "#ffffff",
}));

const ActionButton = styled(IconButton)(() => ({
  padding: "4px",
  color: "#6B7280",
  "&:hover": {
    backgroundColor: "#F3F4F6",
    color: "#374151",
  },
}));

const StyledMenu = styled(Menu)(() => ({
  "& .MuiPaper-root": {
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    minWidth: "160px",
    padding: "8px 0",
    backgroundColor: "#ffffff",
  },
}));

const StyledMenuItem = styled(MenuItem)(() => ({
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  color: "#374151",
  padding: "8px 16px",
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#F3F4F6",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
    color: "#6B7280",
    marginRight: "12px",
  },
}));

const PaginationContainer = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderTop: "1px solid #E5E7EB",
  "@media (min-width: 768px)": {
    flexDirection: "row",
  },
}));

const PaginationInfo = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  "@media (min-width: 768px)": {
    marginBottom: "0",
  },
}));

const PageInfo = styled("span")(() => ({
  color: "#6B7280",
  marginRight: "12px",
}));

const PaginationButtons = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));

const PageButton = styled("button")(() => ({
  border: "1px solid #D1D5DB",
  backgroundColor: "transparent",
  color: "#374151",
  padding: "4px 8px",
  margin: "0 4px",
  borderRadius: "4px",
  cursor: "pointer",
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  "&:hover:not(:disabled)": {
    backgroundColor: "#F3F4F6",
  },
}));

const PageSizeSelect = styled("select")(() => ({
  border: "1px solid #D1D5DB",
  borderRadius: "4px",
  padding: "4px 8px",
  margin: "0 8px",
  backgroundColor: "transparent",
  color: "#374151",
}));

type Column<RowType = Record<string, unknown>> = {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (row: RowType) => React.ReactNode;
  width?: string;
};

type SharedTableProps<RowType extends Record<string, any>> = {
  columns: Column<RowType>[];
  rows: RowType[];
  totalResults?: number;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (newPage: number) => void;
  onPageSizeChange?: (newSize: number) => void;
  onView?: (row: RowType) => void;
  onEdit?: (row: RowType) => void;
  onDelete?: (row: RowType) => void;
};

const TableRowMemo = memo(
  ({
    row,
    columns,
    onOpenMenu,
  }: {
    row: any;
    columns: Column<any>[];
    onOpenMenu: (event: React.MouseEvent<HTMLButtonElement>, row: any) => void;
  }) => (
    <StyledTableRow>
      {columns.map((col) => (
        <StyledTableCell
          key={col.id}
          align={col.align || "left"}
          className="body"
        >
          {col.render ? col.render(row) : row[col.id]}
        </StyledTableCell>
      ))}
      <StyledTableCell
        align="right"
        className="body"
        style={{ width: "80px", paddingRight: "12px" }}
      >
        <ActionButton onClick={(e) => onOpenMenu(e, row)}>
          <MoreVertIcon />
        </ActionButton>
      </StyledTableCell>
    </StyledTableRow>
  )
);

export default function SharedTable<
  RowType extends Record<string, any> = Record<string, any>
>({
  columns,
  rows,
  totalResults = 0,
  currentPage = 1,
  itemsPerPage = 5,
  onPageChange,
  onPageSizeChange,
  onView,
  onEdit,
  onDelete,
}: SharedTableProps<RowType>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const open = Boolean(anchorEl);

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const handleOpenMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, row: RowType) => {
      setAnchorEl(event.currentTarget);
      setSelectedRow(row);
    },
    []
  );

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
    setSelectedRow(null);
  }, []);

  const handleAction = useCallback(
    (action: "view" | "edit" | "delete") => {
      if (!selectedRow) return;
      if (action === "view" && onView) onView(selectedRow);
      if (action === "edit" && onEdit) onEdit(selectedRow);
      if (action === "delete" && onDelete) onDelete(selectedRow);
      handleCloseMenu();
    },
    [selectedRow, onView, onEdit, onDelete, handleCloseMenu]
  );

  return (
    <StyledTableContainer>
      <Table sx={{ minWidth: 700, tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell
                key={col.id}
                align={col.align || "center"}
                className="head"
              >
                {col.label}
              </StyledTableCell>
            ))}
            <StyledTableCell
              align="center"
              className="head"
              style={{ width: "80px", paddingRight: "12px" }}
            ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRowMemo
              key={rowIndex}
              row={row}
              columns={columns}
              onOpenMenu={handleOpenMenu}
            />
          ))}
        </TableBody>
      </Table>

      <PaginationContainer>
        <PaginationInfo>
          <span style={{ color: "#6B7280", marginRight: "8px" }}>Showing</span>
          <PageSizeSelect
            value={itemsPerPage}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </PageSizeSelect>
          <span style={{ color: "#6B7280" }}>of {totalResults} Results</span>
        </PaginationInfo>

        <PaginationButtons>
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>
          <PageButton
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </PageButton>
          <PageButton
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            ›
          </PageButton>
        </PaginationButtons>
      </PaginationContainer>

      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
        {onView && (
          <StyledMenuItem onClick={() => handleAction("view")}>
            <VisibilityIcon sx={{ color: "blue !important" }} />
            View
          </StyledMenuItem>
        )}
        {onEdit && (
          <StyledMenuItem onClick={() => handleAction("edit")}>
            <EditIcon sx={{ color: "blue !important" }} />
            Edit
          </StyledMenuItem>
        )}
        {onDelete && (
          <StyledMenuItem onClick={() => handleAction("delete")}>
            <DeleteIcon sx={{ color: "blue !important" }} />
            Delete
          </StyledMenuItem>
        )}
      </StyledMenu>
    </StyledTableContainer>
  );
}
