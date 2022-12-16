import { Box, Button } from "native-base"
import HStackVCenter from "../../flexboxes/HStackVCenter"

interface Props {
  submitButtonId?: string
  disabled?: boolean
  isLoadingAndDisabled?: boolean
  onSave?: () => void
  onCancel?: () => void
  saveText?: string
  onEnabledAndCtrlEnter?: () => void
  saveButtonWidth?: string
}

const SaveCancelButtons = (props: Props) => {
  return (
    <HStackVCenter>
      <Button
        isLoading={props.isLoadingAndDisabled}
        width={props.saveButtonWidth || "64px"}
        // type="submit"
        variant="solid"
        color="primary.500"
        // id={props.submitButtonId}
        disabled={props.disabled}
        onPress={props.onSave}
      >
        {props.saveText || "Save"}
      </Button>

      <Box ml={2}>
        <Button onPress={props.onCancel} variant="outlined">
          Cancel
        </Button>
      </Box>
    </HStackVCenter>
  )
}

export default SaveCancelButtons
