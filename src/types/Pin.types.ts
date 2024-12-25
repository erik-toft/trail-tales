export type Pin = {
  _id: string;
  title: string;
  year?: number;
  description?: string;
  lat: number;
  lng: number;
  images?: Image[];
};

export type Image = {
  id: string;
  name: string;
  size: number;
  url: string;
  comment?: string;
};
