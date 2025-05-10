import {
  OpenPanelComponent,
  type PostEventPayload,
  useOpenPanel,
} from '@openpanel/nextjs'

import { env } from '@/env'

const isProd = process.env.NODE_ENV === 'production'

const Provider = () => (
  <OpenPanelComponent
    clientId={env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID}
    trackAttributes={true}
    trackScreenViews={isProd}
    trackOutgoingLinks={isProd}
  />
)

const track = (options: { event: string } & PostEventPayload['properties']) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { track: openTrack } = useOpenPanel()

  if (!isProd) {
    console.log('Track', options)
    return
  }

  const { event, ...rest } = options

  openTrack(event, rest)
}

export { Provider, track }
