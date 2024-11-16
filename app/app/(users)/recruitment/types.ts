export type Email = {
  body: string;
  date: string;
  from: string;
  id: string;
  read: boolean;
  responseDate?: string;
  status?: string;
  subject: string;
};

export type ErrorResponse = {
  detail: {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
};

export type AcceptResponse = {
  id: string;
  subject: string;
  sender: string;
  content: string;
  responseType: string;
  responseContent: string;
};

export type RejectResponse = AcceptResponse & {
  rejectReasons: string[];
};
