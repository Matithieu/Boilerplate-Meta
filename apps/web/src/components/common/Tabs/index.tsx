import {
  Tabs as ShadTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { makeStyles } from '@/theme/makeStyles'
import { FC } from 'react'

interface TabsProps {
  tabs: Array<{
    content: JSX.Element
    name: string
  }>
}

const useStyles = makeStyles()((theme) => ({
  list: {
    marginLeft: 0,
    [theme.bp.md]: { marginLeft: '1rem' },
  },
  contentWrapper: {
    marginTop: '1rem',
  },
}))

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const { classes } = useStyles()
  return (
    <ShadTabs defaultValue={tabs[0]?.name}>
      <TabsList className={classes.list}>
        {tabs.map(({ name }) => (
          <TabsTrigger key={name} value={name}>
            {name}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className={classes.contentWrapper}>
        {tabs.map(({ content, name }) => (
          <TabsContent key={name} value={name}>
            {content}
          </TabsContent>
        ))}
      </div>
    </ShadTabs>
  )
}

export default Tabs
