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
  status?: EStatus;
};

export type TList<T> = {
  list: T[];
  total: number;
};

export type TProduct = {
  id: string;
  store_id: string;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
};

export enum EStatus {
  PENDING = "pending",
  MAKING = "making",
  DELIVERY = "delivery",
  DONE = "done",
  CANCELLED = "cancelled",
}

export type TClientInfo = {
  name: string;
  contact: string;
  address: {
    street: string;
    number: number;
    neighborhood: string;
  };
};

export type TOrder = {
  id: string;
  store_id: string;
  status: EStatus;
  client_info: string | TClientInfo;
  observations?: string;
  created_at: string | Date;
  products: (TProduct & { quantity: number })[];
};

export type TOrderProduct = TProduct & { quantity: number };
