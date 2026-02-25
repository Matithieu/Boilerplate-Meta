import Loading from '@/components/common/Loading/Loading'
import Button from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import useUserStore from '../../../stores/UserStore'
import { User } from '../../../types/index.types'
import { fetchUser, updateUser } from '../../../utils/api/queries'
import { isNotNullOrUndefined } from '../../../utils/assertion.util'
import AccountMessages from '../account.messages'

// ToDo: Migrate this to React Hook Form
const Account: FC = () => {
  const { user, setUser } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(user)

  const { data, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const mutation = useMutation({
    mutationFn: () => {
      if (isNotNullOrUndefined(editedUser))
        return updateUser({ user: editedUser })
      else throw new Error('No user to update')
    },
    mutationKey: ['updateUser' + editedUser?.email],
    onError: (error) => {
      toast.error(`Error updating user: ${error.message}`)
    },
    onSuccess: () => {
      refetch()
      toast.success('User updated')
    },
  })

  useEffect(() => {
    if (data) {
      setEditedUser(data)
      setUser(data)
    }
  }, [data, setUser])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (user !== null) {
      setIsEditing(false)
      mutation.mutate()
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof User,
  ) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [key]: e.target.value })
    }
  }

  if (isNotNullOrUndefined(editedUser)) {
    return (
      <Card
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          maxWidth: '800px',
          flexDirection: 'column',
          padding: '0.5rem',
        }}
      >
        <h3
          style={{
            marginBottom: '0.25rem',
            fontSize: '1.5rem',
            fontWeight: 600,
          }}
        >
          {formatMessage(AccountMessages.accountDetails)}
        </h3>
        <Separator />

        <form>
          <div
            style={{
              marginTop: '1.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '1.5rem',
            }}
          >
            <div style={{ gridColumn: 'span 12 / span 12' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <Label htmlFor="firstName">
                  {formatMessage(commonMessages.firstName)}
                </Label>
                <Input
                  disabled={!isEditing}
                  id="firstName"
                  value={editedUser.firstName ?? undefined}
                  onChange={(e) => handleChange(e, 'firstName')}
                />
              </div>

              <div
                style={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <Label htmlFor="lastName">
                  {formatMessage(commonMessages.lastName)}
                </Label>
                <Input
                  disabled={!isEditing}
                  id="lastName"
                  value={editedUser.lastName ?? undefined}
                  onChange={(e) => handleChange(e, 'lastName')}
                />
              </div>
            </div>

            <div style={{ gridColumn: 'span 12 / span 12' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                }}
              >
                <Label htmlFor="phone">
                  {formatMessage(commonMessages.phone)}
                </Label>
                <Input
                  disabled={!isEditing}
                  id="phone"
                  value={editedUser.phone ?? undefined}
                  onChange={(e) => handleChange(e, 'phone')}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '1.25rem',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Loading isCentered isLoading={mutation.isPending}>
              <Button onClick={isEditing ? handleSave : handleEdit}>
                {formatMessage(
                  isEditing ? commonMessages.save : commonMessages.edit,
                )}
              </Button>
            </Loading>
          </div>
        </form>
      </Card>
    )
  }
}

export default Account
