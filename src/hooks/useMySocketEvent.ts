import { useSocket, useSocketEvent } from "socket.io-react-hook"
import envVars from "../../envVars"

export function useMySocketEvent<T>(eventName: string) {
  const { socket } = useSocket(envVars.API_URL)

  return useSocketEvent<T>(socket, eventName)
}
