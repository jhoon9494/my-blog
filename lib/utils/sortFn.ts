import { PostType } from './post';

export default function compareDate(a: PostType, b: PostType) {
  const ADate = new Date(a.date);
  const BDate = new Date(b.date);
  if (ADate > BDate) return -1;
  return 1;
}
