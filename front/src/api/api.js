import { baseAPI } from './baseAPI';

export const customers = {
    get_all: `${baseAPI}/customers/all`,
    get_by_id: `${baseAPI}/customers/`,
    post_register: `${baseAPI}/customers/register`
}