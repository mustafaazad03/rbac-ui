import Image from "next/image"

export interface User {
  id: string
  name: string
  role: string
  department: string
  imageUrl: string
  selected?: boolean
}

interface UserCardProps {
  user: User
  onSelect: (userId: string) => void
}

export function UserChip({ user, onSelect }: UserCardProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg transition-colors hover:bg-gray-bg cursor-pointer ${user.selected && "bg-fade-primary-red-2"} `}
      onClick={() => onSelect(user.id)}
      role="checkbox"
      aria-checked={user.selected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onSelect(user.id)
        }
      }}
    >
      <Image
        src={user.imageUrl}
        width={100}
        height={100}
        alt=""
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-dark-blue">{user.name}</h3>
        <p className="text-secondary-red">
          {user.role}, {user.department}
        </p>
      </div>
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${user.selected? "border-secondary-red bg-secondary-red text-primary-red" : "border-gray-border"}`}
      >
        {user.selected && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
  )
}

