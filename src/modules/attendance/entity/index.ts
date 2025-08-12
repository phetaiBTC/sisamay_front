import type { Dayjs } from "dayjs";

export interface AttendanceEntity {
    id: number;
    userId: number;
    clinicId: number;
    date: Dayjs;
    check_in_time: Dayjs | null;
    check_out_time: Dayjs | null;
    status: 'present' | 'late' | 'absent';
    note: string | null;
    user_username: string;
    user_email: string;
    clinic_name: string;
    createdAt: Dayjs;
    updatedAt: Dayjs;
    deletedAt: Dayjs | null;
}