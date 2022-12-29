import { useTheme } from "native-base"
import { useMemo } from "react"
import { useWindowDimensions } from "react-native"
import { TabBar, TabView } from "react-native-tab-view"
import { useImportItemsQuery } from "../../../../hooks/react-query/import-item/useImportItemsQuery"

interface Props {
  tabIndex: number
  changeTabIndex: (tabIndex: number) => void
  requestId: string
}

export default function ImportResultsModalTabs(props: Props) {
  const layout = useWindowDimensions()

  const { data: importItems } = useImportItemsQuery(props.requestId)

  const routes = useMemo(() => {
    const importedCount =
      importItems?.filter((i) => i.status === "importedSuccessfully").length ||
      0

    const alreadyRatedCount =
      importItems?.filter((i) => i.status === "alreadyRated").length || 0

    const errorOrNotFoundCount =
      importItems?.filter((i) => i.status === "errorOrNotFound").length || 0

    return [
      { key: "first", title: `${importedCount} imported` },
      { key: "second", title: `${alreadyRatedCount} already rated` },
      { key: "third", title: `${errorOrNotFoundCount} error or not found` },
    ]
  }, [importItems])

  const theme = useTheme()

  return (
    <TabView
      renderTabBar={(p) => (
        <TabBar
          {...p}
          style={{ backgroundColor: "#00000000" }}
          pressColor="#00000000"
          indicatorStyle={{
            backgroundColor: theme.colors.primary[600],
          }}
          tabStyle={{
            width: "auto",
          }}
          scrollEnabled
          labelStyle={{}}
        />
      )}
      navigationState={{ index: props.tabIndex, routes }}
      renderScene={() => null}
      onIndexChange={props.changeTabIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}
