import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { HStack, Image, Text, theme, VStack } from "native-base"
import React from "react"
import { Pressable } from "react-native"
import { useMyColors } from "../../../../hooks/useMyColors"
import { UserItemDto } from "../../../../types/domain/imdb-item/UserItemDto"
import { SyncroItemType } from "../../../../types/domain/SyncroItemType"
import { getImageUrlOrDefaultUrl } from "../../../../utils/getImageUrlOrDefaultUrl"
import SearchItemImdbSection from "../../../SearchNavigationScreens/SearchScreen/SearchItem/SearchItemImdbSection/SearchItemImdbSection"
import SearchItemYourSection from "../../../SearchNavigationScreens/SearchScreen/SearchItem/SearchItemYourSection/SearchItemYourSection"
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
                  <HStack space={1}>
                    <VStackHCenter style={{ width: 24 }}>
                      <FontAwesome5
                        name={"fire"}
                        color={
                          item.interests?.[0]?.interestLevel
                            ? ratingYellow
                            : theme.colors.gray[500]
                        }
                        size={18}
                      />
                    </VStackHCenter>
                    <Text>{item.interests?.[0]?.interestLevel}</Text>
                  </HStack>
                </>
              )}
            </VStack>
            <VStack>
              <SearchItemYourSection
                ratingValue={item.myRating}
                interestLevel={item.myInterest}
              />
            </VStack>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  )
}

export default UserItem
