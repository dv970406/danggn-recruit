// 제너릭으로 조합하면 될것같긴한데 key명을 다르게 쓰고싶어서 패스
export interface IOutputFormat {
  ok: boolean;
  error?: string;
}
export interface ICoreEntityFormat {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInfiniteScrollingInput {
  pageParam: number;
}
