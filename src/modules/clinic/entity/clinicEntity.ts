export interface ClinicEntity {
    id: number;
    name: string;
    radius: number;
    latitude: number;
    longitude: number;
    start_time_work: string;
    end_time_work: string;
    late_threshold_minutes: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    district_id: number;
    district: string;
    province_id: number;
    province: string;
}