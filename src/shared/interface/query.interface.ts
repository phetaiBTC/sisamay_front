export interface IQuery {
    page?: number
    limit?: number,
    search?: string,
    is_active?: 'active'|'inactive',
    sort?: 'ASC'|'DESC',
    type?: 'all' | 'page'
}