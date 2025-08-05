import { useTranslation } from 'react-i18next'

import {
  authorsTableMockup,
  columnsAuthorsTableMockup,
  columnsProjectsTableMockup,
  projectsTableMockup,
} from '@/helpers/mocks/tables'

import TableCommon from '@/components/ui/table-common'

function Tables() {
  const { t } = useTranslation('signUp')

  return (
    <section>
      <div className="bg-background shadow-md rounded-large-small p-4">
        <TableCommon data={authorsTableMockup} columns={columnsAuthorsTableMockup(t)} />
      </div>

      <div className="bg-background shadow-md rounded-large-small p-4 mt-8">
        <TableCommon data={projectsTableMockup} columns={columnsProjectsTableMockup(t)} />
      </div>
    </section>
  )
}

export default Tables
