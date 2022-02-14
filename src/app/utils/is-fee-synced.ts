import { Fee } from 'core/types/fee';

export function isFeeSynced(fee: Fee, syncedAt: string | undefined): boolean {
  if (!syncedAt) {
    return false;
  }

  let {createdAt, updatedAt, removedAt} = fee;
  createdAt ??= '';
  updatedAt ??= '';
  removedAt ??= '';
  return createdAt < syncedAt && updatedAt < syncedAt && removedAt < syncedAt;
}
