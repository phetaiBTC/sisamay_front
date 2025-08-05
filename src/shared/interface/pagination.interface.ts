export interface IPagination<T> {
    data: T[],
    pagination: {
        total: number,
        count: number,
        limit: number,
        totalPages: number,
        currentPage: number
    }
}