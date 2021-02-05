export interface AuthPayloadDto {
  token: string;
  refreshToken: string;
}

export interface PollDto {
  id: string;
  title: string;
  startAt: number;
  endAt: number;
  options: PollOptionDto[];
  voted: boolean;
}

export interface PollOptionDto {
  optionId: string;
  text: string;
  count: number;
  voted?: boolean;
}

export interface PaginationMetaDto {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PollListPayloadDto {
  items: PollDto[];
  meta: PaginationMetaDto;
}
