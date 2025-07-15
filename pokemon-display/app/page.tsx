"use client"

import { useState, useEffect } from "react"
import PokemonDisplay from "../pokemon-display"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Search, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Page() {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchPokemon = async (nameOrId) => {
    if (!nameOrId.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`)

      if (!response.ok) {
        throw new Error("Pokemon not found")
      }

      const data = await response.json()
      setPokemon(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch Pokemon")
      setPokemon(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchPokemon(searchTerm)
  }

  // Load Pikachu by default
  useEffect(() => {
    fetchPokemon("pikachu")
  }, [])

  return (
    <main>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Pokemon Information Display</h1>
          <p className="text-muted-foreground">Search for any Pokemon by name or ID number</p>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Enter Pokemon name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </form>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-2">Loading Pokemon...</span>
          </div>
        )}

        {pokemon && !loading && <PokemonDisplay pokemon={pokemon} />}
      </div>
    </main>
  )
}
