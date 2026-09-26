export interface InseeLegalRateRow {
  year: number;
  publicationDate: string;
  effectiveDate: string;
  hourlyGrossEur: number | null;
  monthlyGross151: number | null;
  monthlyGross169Eur: number | null;
  hourlyGrossFrf: number | null;
  monthlyGross169Frf: number | null;
}

export interface InseeInflationQuarter {
  quarter: string;
  smicIndex: number;
  priceIndex: number;
}

export interface InseeSmic39Annual {
  year: number;
  monthlyHours: number;
  hourlyGrossEur: number;
  monthlyGrossEur: number;
}
