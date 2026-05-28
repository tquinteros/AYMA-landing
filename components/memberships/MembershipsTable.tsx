import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Membership {
  id: string
  name: string
  price: number
  anualPrice?: number
  features: string[]
}

interface ParsedFeature {
  label: string
  value?: string
}

const featureValuePattern = /\s+((?:\d+\s*x\s*mes)|ilimitad[oa])$/i

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-AR").format(price)
}

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mx-auto"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6125 1.04756C10.6812 0.26149 9.3188 0.261491 8.38749 1.04756L7.53932 1.76345C7.14349 2.09755 6.65365 2.30046 6.1375 2.34411L5.03155 2.43764C3.81717 2.54034 2.85381 3.5037 2.75111 4.71807L2.65759 5.82402C2.61394 6.34017 2.41102 6.83001 2.07692 7.22586L1.36104 8.07401C0.574966 9.00532 0.574967 10.3677 1.36104 11.299L2.07692 12.1472C2.41102 12.543 2.61394 13.0329 2.65759 13.549L2.75111 14.655C2.85381 15.8694 3.81717 16.8328 5.03155 16.9354L6.1375 17.0289C6.65365 17.0726 7.14349 17.2755 7.53934 17.6096L8.38749 18.3255C9.3188 19.1115 10.6812 19.1115 11.6125 18.3255L12.4607 17.6096C12.8565 17.2755 13.3464 17.0726 13.8625 17.0289L14.9685 16.9354C16.1829 16.8328 17.1462 15.8694 17.2489 14.655L17.3424 13.549C17.3861 13.0329 17.589 12.543 17.9231 12.1472L18.639 11.299C19.425 10.3677 19.425 9.00532 18.639 8.07401L17.9231 7.22585C17.589 6.83001 17.3861 6.34017 17.3424 5.82402L17.2489 4.71807C17.1462 3.5037 16.1829 2.54034 14.9685 2.43764L13.8625 2.34411C13.3464 2.30046 12.8565 2.09755 12.4607 1.76345L11.6125 1.04756ZM14.546 7.98207C14.9854 7.54274 14.9854 6.83042 14.546 6.39109C14.1067 5.95174 13.3944 5.95174 12.955 6.39109L8.75054 10.5956L7.04604 8.89109C6.6067 8.45174 5.89439 8.45174 5.45505 8.89109C5.0157 9.33042 5.0157 10.0427 5.45505 10.4821L7.95505 12.982C8.39439 13.4214 9.1067 13.4214 9.54604 12.982L14.546 7.98207Z"
      fill="currentColor"
    />
  </svg>
)

const normalizeFeatureKey = (feature: string) => {
  return feature
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(la|el|los|las)\b/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

const parseFeature = (feature: string): ParsedFeature => {
  const [rawLabel, rawValue] = feature.split("|").map((part) => part.trim())

  if (rawValue) {
    return {
      label: rawLabel,
      value: rawValue,
    }
  }

  const valueMatch = rawLabel.match(featureValuePattern)

  if (valueMatch) {
    return {
      label: rawLabel.replace(featureValuePattern, "").trim(),
      value: valueMatch[1],
    }
  }

  return { label: rawLabel }
}

const MembershipsTable = ({
  memberships,
  isAnnual = false,
}: {
  memberships: Membership[]
  isAnnual?: boolean
}) => {
  const featureRows = Array.from(
    memberships.reduce<Map<string, string>>((features, membership) => {
      membership.features.forEach((feature) => {
        const { label } = parseFeature(feature)
        const key = normalizeFeatureKey(label)

        if (!features.has(key)) {
          features.set(key, label)
        }
      })

      return features
    }, new Map())
  )

  const membershipFeatureValues = memberships.map((membership) => {
    return membership.features.reduce<Map<string, ParsedFeature>>(
      (features, feature) => {
        const parsedFeature = parseFeature(feature)
        features.set(normalizeFeatureKey(parsedFeature.label), parsedFeature)

        return features
      },
      new Map()
    )
  })

  if (memberships.length === 0) {
    return (
      <div className="rounded-3xl border border-roca-500/20 bg-surface-500 p-8 text-center text-sm text-roca-500">
        No hay membresías disponibles para comparar.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-roca-500/20 bg-surface-500 text-roca-500">
      <Table className="min-w-[900px] bg-surface-500 border-collapse">
        <TableHeader>
          <TableRow className="border-roca-500/20 hover:bg-transparent">
            <TableHead className="sticky left-0 z-20 w-[220px] border-r border-roca-500/20 bg-surface-500 text-roca-500 after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-roca-500 after:content-['']" />
            {memberships.map((membership) => {
              const selectedPrice = isAnnual ? membership.anualPrice : membership.price
              const periodLabel = isAnnual ? "/Año" : "/Mes"
              const hasSelectedPrice = selectedPrice !== undefined

              return (
                <TableHead
                  key={membership.id}
                  className="min-w-36 border-r border-roca-500/20 bg-surface-500 px-4 py-5 text-center text-roca-500 last:border-r-0"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-bold uppercase tracking-wide">
                      {membership.name}
                    </span>
                    <span className="text-base font-bold">
                      {hasSelectedPrice ? `$${formatPrice(selectedPrice)}` : "---"}
                      {hasSelectedPrice && (
                        <span className="ml-1 text-xs font-normal">
                          {periodLabel}
                        </span>
                      )}
                    </span>
                  </div>
                </TableHead>
              )
            })}
          </TableRow>

        </TableHeader>
        <TableBody>
          {featureRows.map(([featureKey, featureLabel]) => (
            <TableRow
              key={featureKey}
              className="border-roca-500/20 hover:bg-roca-500/5"
            >
              <TableCell className="sticky left-0 z-10 border-r border-roca-500/20 bg-surface-500 px-4 py-5 text-roca-500 after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-roca-500 after:content-['']">
                {featureLabel}
              </TableCell>
              {membershipFeatureValues.map((features, index) => {
                const feature = features.get(featureKey)
                return (
                  <TableCell
                    key={`${memberships[index].id}-${featureKey}`}
                    className="border-r border-roca-500/20 bg-surface-500 px-4 py-5 text-center text-sm text-roca-500 last:border-r-0"
                  >
                    {feature ? (
                      feature.value ? (
                        feature.value
                      ) : (
                        <CheckIcon />
                      )
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg width="21" height="1" viewBox="0 0 21 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line y1="0.5" x2="20.291" y2="0.5" stroke="#252727" />
                        </svg>
                      </div>
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MembershipsTable