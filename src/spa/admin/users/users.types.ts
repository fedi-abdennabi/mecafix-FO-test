import { Pack } from '@/spa/Packs/Pack.type';

export type UserRole = 'ROLE_SUPER_ADMIN' | 'ROLE_ADMIN';

export type User = {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  email: string;
  activated: boolean;
  langKey: string;
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  phoneNumber?: string;
  isAdmin?: boolean;
  employerId?: number | null;
  packId?: number | null;
  pack?: Pack;
  contractNbCreated: number;
  isPremium: boolean;
  role: {
    id: number,
    roleName: string
  },
  status:boolean
};


export type UserListResult = {
  data: User[];
  current_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  prev_page_url: string;
  from: number;
  to: number;
  total: number;
  last_page: number;
  per_page: number;
};
