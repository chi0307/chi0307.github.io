import typia, { tags } from 'typia'

export interface Item {
  name: string
  order?: number
  list: string[] | null
}

export const isItem = typia.createIs<Item>()

type stringArray = string[] & tags.MinItems<10>
type numberArray = number[] & tags.MinItems<10>

describe('Typia validation for Item type', () => {
  test.each<Record<string, unknown>>([
    {
      name: typia.random<string>(),
      list: [],
    },
    {
      name: typia.random<string>(),
      list: typia.random<stringArray>(),
    },
    {
      name: typia.random<string>(),
      list: null,
    },
    {
      name: typia.random<string>(),
      order: typia.random<number>(),
      list: typia.random<stringArray>(),
    },
    {
      name: typia.random<string>(),
      order: typia.random<number>(),
      list: null,
    },
    {
      name: typia.random<string>(),
      order: typia.random<number>(),
      list: typia.random<stringArray>(),
      list2: typia.random<stringArray>(), // Extra fields should not affect typia's createIs validation
    },
  ])('should pass for valid object %o', (obj) => {
    expect(isItem(obj)).toBe(true)
  })
  test.each<Record<string, unknown>>([
    {
      name: typia.random<number>(), // expect string
      list: typia.random<stringArray>(),
    },
    {
      name: typia.random<string>(),
      order: typia.random<string>(), // expect number
      list: typia.random<stringArray>(),
    },
    {
      name: typia.random<string>(),
      list: typia.random<numberArray>(), // expect string[]
    },
    {
      name: typia.random<string>(),
      // missing list string[]
      list2: typia.random<stringArray>(),
    },
    {
      name: typia.random<string>(),
      list: typia.random<numberArray>(), // expect string[]
    },
  ])('should fail for invalid object %o', (obj) => {
    expect(isItem(obj)).toBe(false)
  })
})
