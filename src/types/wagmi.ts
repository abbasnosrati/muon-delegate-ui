export type W3bNumber = {
  hStr: string; // human-readable string - complete number in string
  dsp: number; // display number - number rounded to meaningful number of decimal places, here 2
  big: bigint; // big integer - complete number in bigint
  bigStr: string; // big integer string - complete number in string
};

export type BalanceData = {
  decimals: number;
  formatted: string;
  symbol: string;
  value: bigint;
};
