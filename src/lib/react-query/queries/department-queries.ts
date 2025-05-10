import { useQuery } from '@tanstack/react-query'

import { getDepartmentOptions } from '@/lib/prisma/queries/cached-queries'

async function getDepartmentOptionsQuery(searchDepartment?: string) {
  const departments = await getDepartmentOptions(searchDepartment)
  return departments.map((department) => ({
    label: department.label,
    value: department.value,
  }))
}

export function useDepartmentOptions(searchDepartment?: string) {
  return useQuery({
    queryKey: ['departments-options', searchDepartment],
    queryFn: () => getDepartmentOptionsQuery(searchDepartment),
  })
}
