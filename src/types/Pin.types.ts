export type Pin = {
  _id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  images: { name: string; id: string; size: number }[];
};

export type Image = {
  name: string;
  path: string;
  size: number;
  type: string;
  uid: string;
  url: string;
};
