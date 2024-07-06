export type TDay = {
  open: string;
  close: string;
  is_open: boolean;
};

export type TScheduling = {
  sunday: TDay;
  monday: TDay;
  tuesday: TDay;
  wednesday: TDay;
  thursday: TDay;
  friday: TDay;
  saturday: TDay;
};

export type TStore = {
  id: string;
  name: string;
  description: string;
  nick: string;
  scheduling: string | TScheduling;
  email: string;
  password: string;
};

export type TQuery = {
  query?: string;
  page: number;
  pageSize: number;
};

export type TList<T> = {
  list: T[];
  total: number;
};
