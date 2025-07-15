import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export interface PokemonProps {
  pokemon: {
    id: number
    name: string
    height: number
    weight: number
    sprites: {
      front_default: string
      other: {
        "official-artwork": {
          front_default: string
        }
      }
    }
    types: Array<{
      type: {
        name: string
      }
    }>
    stats: Array<{
      base_stat: number
      stat: {
        name: string
      }
    }>
    abilities: Array<{
      ability: {
        name: string
      }
      is_hidden: boolean
    }>
  }
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
}

export default function PokemonDisplay({ pokemon }: PokemonProps) {
  const formatStatName = (statName: string) => {
    return statName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pokemon Image and Basic Info */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{formatName(pokemon.name)}</CardTitle>
            <CardDescription>#{pokemon.id.toString().padStart(3, "0")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-48 h-48 object-contain"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Height</p>
                <p className="font-semibold">{(pokemon.height / 10).toFixed(1)} m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Types</p>
              <div className="flex gap-2 justify-center">
                {pokemon.types.map((type, index) => (
                  <Badge key={index} className={`${typeColors[type.type.name] || "bg-gray-400"} text-white`}>
                    {formatName(type.type.name)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Abilities */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Base Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{formatStatName(stat.stat.name)}</span>
                    <span className="font-medium">{stat.base_stat}</span>
                  </div>
                  <Progress value={(stat.base_stat / 255) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pokemon.abilities.map((ability, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant={ability.is_hidden ? "secondary" : "default"}>
                      {formatName(ability.ability.name.replace("-", " "))}
                    </Badge>
                    {ability.is_hidden && <span className="text-xs text-muted-foreground">(Hidden)</span>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
