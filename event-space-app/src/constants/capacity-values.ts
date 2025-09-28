// export const capacityValues = [
//   'Любая',
//   'До 30 человек',
//   '30 - 100 человек',
//   'Более 100 человек'
// ]

interface CapacityValue {
  label: string
  minCapacity?: number
  maxCapacity?: number
}

export const capacityValues: CapacityValue[] = [
  {label: 'Любая', minCapacity: undefined, maxCapacity: undefined},
  {label: 'До 30 человек', minCapacity: undefined, maxCapacity: 30},
  {label: '30 - 100 человек', minCapacity: 30, maxCapacity: 100},
  {label: 'Более 100 человек', minCapacity: 100},
]