import { MaterialCommunityIcons } from "@expo/vector-icons"
import { HStack, Image, Text, theme, VStack } from "native-base"
import React from "react"
import { Pressable } from "react-native"
import { useMyColors } from "../../../../hooks/useMyColors"
import { SyncroItemType } from "../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType"
import { UserItemDto } from "../../../../types/domain/syncro-item/UserItemDto"
import { getImageUrlOrDefaultUrl } from "../../../../utils/getImageUrlOrDefaultUrl"
import SearchItemImdbSection from "../../../SearchNavigationScreens/SearchScreen/SyncroItemSearchResults/ImdbSearchItem/SearchItemImdbSection/SearchItemImdbSection"
import SearchItemYourSection from "../../../SearchNavigationScreens/SearchScreen/SyncroItemSearchResults/ImdbSearchItem/SearchItemYourSection/SearchItemYourSection"
import VStackHCenter from "../../../_common/flexboxes/VStackHCenter"
import CustomPositionSection from "./CustomPositionSection/CustomPositionSection"

interface Props {
  item: UserItemDto
  onPress: () => void
  thisIsYourList: boolean
  itemType: SyncroItemType
  isCustomOrdering: boolean
}

const UserItem = ({ item, itemType, ...props }: Props) => {
  const { ratingYellow } = useMyColors()

  return (
    <Pressable key={item.id} onPress={props.onPress}>
      <HStack space="4">
        <Image
          src={getImageUrlOrDefaultUrl(item.imageUrl)}
          width="100px"
          height="100px"
          alt={item.title}
        />

        <VStack style={{ flexShrink: 1 }}>
          <Text style={{ fontWeight: "500" }} noOfLines={1}>
            {item.title} {item.year && `(${item.year})`}
          </Text>

          <HStack mt={2}>
            <VStack style={{ width: 120 }}>
              {props.thisIsYourList ? (
                props.isCustomOrdering ? (
                  <CustomPositionSection itemId={item.id} itemType={itemType} />
                ) : (
                  <SearchItemImdbSection
                    avgRating={item.avgRating}
                    ratingCount={item.ratingCount}
                    title={item.type === "game" ? "IGDB" : "IMDB"}
                  />
                )
              ) : (
                <>
                  <Text fontWeight="semibold">Them</Text>

                  <HStack space={1}>
                    <VStackHCenter style={{ width: 24 }}>
                      <MaterialCommunityIcons
                        name="star"
                        color={
                          item.ratings?.[0]?.ratingValue
                            ? ratingYellow
                            : theme.colors.gray[500]
                        }
                        size={18}
                        style={{ position: "relative", top: 2 }}
                      />
                    </VStackHCenter>
                    {item.ratings?.[0]?.ratingValue ? (
                      <Text>{item.ratings?.[0]?.ratingValue || ""}</Text>
                    ) : (
                      <Text>?</Text>
                    )}
                  </HStack>
                  {item.interests?.[0]?.interestLevel && (
                    <HStack space={1}>
                      <VStackHCenter style={{ width: 24 }}>
                        <MaterialCommunityIcons
                          name={
                            item.interests?.[0]?.interestLevel
                              ? "bookmark-check"
                              : "bookmark-outline"
                          }
                          color={
                            item.interests?.[0]?.interestLevel
                              ? ratingYellow
                              : theme.colors.gray[500]
                          }
                          size={18}
                        />
                      </VStackHCenter>
                      <Text>
                        {item.interests?.[0]?.interestLevel && "Saved"}
                      </Text>
                    </HStack>
                  )}
                </>
              )}
            </VStack>
            <VStack>
              <SearchItemYourSection itemId={item.id} />
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}

export default UserItem
