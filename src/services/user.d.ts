export declare interface User {
  phone: string;
  password: string;
}

export declare interface UserId {
  userId: string | number;
}

export declare interface UserFilter {
  currentPage: number;
  pageSize: number;
  phone: string;
  startCreateTime: string;
  endCreateTime: string;
  rangeDate: Array<string>[];
}
