const TYPE = {
  DEBIT: "Dr",
  CREDIT: "Cr",
};

const ROLE = {
  MARKETING: "MARKETING",
  OPERATION: "OPERATION",
  FINANCE: "FINANCE",
  ACCOUNTING: "ACCOUNTING",
  HRD: "HRD",
  GA: "GA",
  MANAGER: "MANAGER",
};

const INV_STATUS = {
  UNPAID: "BELUM DIBAYAR",
  PARTIAL: "DIBAYAR SEBAGIAN",
  PAID: "LUNAS",
};

const WO_STATUS = {
  UNPROCESSED: "BELUM DIPROSES",
  IN_PROCESS: "DALAM PROSES",
  PROCESSED: "SUDAH DIPROSES",
};

const DETAILS_STATUS = {
  WO: "WORK-ORDER",
  TR: "TRANSACTION",
};

const CATEGORY = {
  SALES: "PENJUALAN",
  PURCHASE: "PEMBELIAN",
  EXPENSE: "BIAYA",
  OTHERS: "LAIN-LAIN",
};
const DETAILS_CATEGORY = {};

module.exports = {
  TYPE,
  ROLE,
  DETAILS_STATUS,
  INV_STATUS,
  CATEGORY,
  DETAILS_CATEGORY,
  WO_STATUS,
};
