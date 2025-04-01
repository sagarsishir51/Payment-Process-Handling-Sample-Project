export type PaginationProps =
  | {
      pagination: true;
      page: number;
      size: number;
      sort?: string;
      order?: 'ASC' | 'DESC';
      search?: string;
    }
  | {
      pagination: false;
      page?: number;
      size?: number;
      sort?: string;
      order?: 'ASC' | 'DESC';
      search?: string;
    };
