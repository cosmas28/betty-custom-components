import { Icon, prefab } from '@betty-blocks/component-sdk'

import { Row } from './structures/Row'
import { Column } from './structures/Column'
import { options } from './structures/Column/options'

const columnOptions = { ...options };

const attrs = {
	icon: Icon.RowColumnIcon,
	category: 'LAYOUT',
	keywords: ['Layout', 'column', 'columns', '1'],
}

export default prefab('1 Column', attrs, undefined, [Row({}, [Column({ options: columnOptions })])]);
