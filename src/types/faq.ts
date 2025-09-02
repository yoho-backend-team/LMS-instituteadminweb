export interface AddFAQData {
  title: string;
  description: string;
  category1: string;
  category2: string;
}

export interface FAQItem {
  id: number;
  name: string;
  address: string;
  uuid: string;
  title: string;
  description: string;
}

export interface EditFAQData {
  name: string;
  address: string;
}
