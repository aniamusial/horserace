export interface HrLapCardRow {
  id: number
  position: number
  name: string
}

export interface HrLapCardProps {
  title: string
  rows: HrLapCardRow[]
  isActive?: boolean
  isCompleted?: boolean
}
