import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { ScrollView, useTheme } from "native-base"
import { Linking } from "react-native"
import { useMyInterestQU } from "../../../../hooks/react-query/interest/useMyInterestsQuery"
import useToggleSaveItemMutation from "../../../../hooks/react-query/interest/useToggleSaveItemMutation"
import { useMyRatingQU } from "../../../../hooks/react-query/rating/useMyRatingsQuery"
import useRecommendItemActionSheetStore from "../../../../hooks/zustand/action-sheets/useRecommendItemActionSheetStore"
import useRatingModalStore from "../../../../hooks/zustand/modals/useRatingModalStore"
import { buildRatingDto } from "../../../../types/domain/rating/RatingDto"
import { SyncroItemDto } from "../../../../types/domain/syncro-item/SyncroItemDto"
import { useSyncroItemTypeMap } from "../../../../types/domain/syncro-item/SyncroItemType/useSyncroItemTypeMap"
import { urls } from "../../../../utils/urls"
import RatingRowButton from "./RatingRowButton/RatingRowButton"

interface Props {
  syncroItem: SyncroItemDto
}

const RatingRow = ({ syncroItem }: Props) => {
  const myRating = useMyRatingQU(syncroItem.id)

  const myInterest = useMyInterestQU(syncroItem.id)

  const theme = useTheme()

  const openRatingModal = useRatingModalStore((s) => s.openModal)

  const { mutate: submitToggleSave } = useToggleSaveItemMutation()

  const openExternalLink = () => {
    Linking.canOpenURL(urls.others.imdbItem(syncroItem.id)).then(
      (supported) => {
        if (!supported) {
          return
        }

        // PE 1/3 - dry
        if (syncroItem.type === "game") {
          if (!syncroItem.igdbUrl) {
            alert("No external link available")
            return
          }
          Linking.openURL(syncroItem.igdbUrl)
          return
        }
        if (syncroItem.type === "manga") {
          if (!syncroItem.mangaMalUrl) {
            alert("No external link available")
            return
          }
          Linking.openURL(syncroItem.mangaMalUrl)
          return
        }

        Linking.openURL(urls.others.imdbItem(syncroItem.id))
      }
    )
  }

  const openActionSheet = useRecommendItemActionSheetStore(
    (s) => s.openActionSheet
  )

  const typeMap = useSyncroItemTypeMap({
    itemType: syncroItem.type,
  })

  return (
    <ScrollView
      horizontal
      paddingBottom={4}
      showsHorizontalScrollIndicator={false}
    >
      <RatingRowButton
        onPress={() =>
          openRatingModal(
            myRating || buildRatingDto({ syncroItemId: syncroItem.id })
          )
        }
        isActive={!!myRating?.ratingValue}
        startIcon={
          <MaterialCommunityIcons
            name={myRating ? "star" : "star-outline"}
            color={theme.colors.dark[900]}
            size={16}
          />
        }
        width="72px"
      >
        {myRating?.ratingValue || "Rate"}
      </RatingRowButton>

      <RatingRowButton
        ml={2}
        onPress={() => submitToggleSave(syncroItem.id)}
        isActive={!!myInterest?.interestLevel}
        startIcon={
          <MaterialCommunityIcons
            name={
              !!myInterest?.interestLevel
                ? "bookmark-check"
                : "bookmark-outline"
            }
            color={theme.colors.dark[900]}
            size={16}
          />
        }
        width="80px"
      >
        {myInterest?.interestLevel ? "Saved" : "Save"}
      </RatingRowButton>

      <RatingRowButton
        ml={2}
        onPress={() => openActionSheet(syncroItem.id)}
        startIcon={
          <MaterialCommunityIcons
            name={"share"}
            color={theme.colors.dark[900]}
            size={16}
          />
        }
        width="120px"
      >
        Recommend
      </RatingRowButton>

      <RatingRowButton
        ml={2}
        onPress={openExternalLink}
        startIcon={
          <AntDesign name={"link"} color={theme.colors.dark[900]} size={16} />
        }
        width="88px"
      >
        {typeMap.site}
      </RatingRowButton>
    </ScrollView>
    // <HStack mt={4} style={{ justifyContent: "space-around" }}>
    //   <VStackHCenter style={{ width: 80 }}>
    //     <MyRatingButton itemId={syncroItem.id} />
    //   </VStackHCenter>

    //   <VStackHCenter style={{ width: 80 }}>
    //     <MyInterestButton itemId={syncroItem.id} />
    //   </VStackHCenter>
    // </HStack>
  )
}

export default RatingRow
