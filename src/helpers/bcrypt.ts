import { hash, compare } from "bcryptjs";

export const hash_data = async (data: string) => hash(data, 10);

export const compare_data = async (data: string, hash: string) =>
  compare(data, hash);
