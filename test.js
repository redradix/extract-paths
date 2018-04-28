const extractPaths = require('./')

describe('extractPaths', () => {

  const obj = {
    a: 'whatever',
    nested1: {
      x: 3,
      morenested: {
        z: '33'
      }
    },
    nested2: {
      y: 'epa'
    }
  }

  it('returns empty array when invalid input', () => {
    expect(extractPaths(undefined)).toEqual([])
    expect(extractPaths(null)).toEqual([])
    expect(extractPaths(3)).toEqual([])
  })

  it('returns full list of object paths', () => {
    const paths = extractPaths(obj)

    expect(paths).toEqual(expect.arrayContaining([
      'a',
      'nested1',
      'nested1.x',
      'nested1.morenested',
      'nested1.morenested.z',
      'nested2',
      'nested2.y',
    ]))
  })

  it('returns paths until depth provided', () => {
    const paths = extractPaths(obj, 2)

    expect(paths).toEqual(expect.arrayContaining([
      'a',
      'nested1',
      'nested1.x',
      'nested1.morenested',
      'nested2',
      'nested2.y'
    ]))

    expect(paths).not.toContain('nested1.morenested.z')
  })

  it('returns only paths with strict depth', () => {
    const paths = extractPaths(obj, 2, true)

    expect(paths).toEqual(expect.arrayContaining([
      'nested1.x',
      'nested1.morenested',
      'nested2.y'
    ]))

    expect(paths).not.toContain('a')
    expect(paths).not.toContain('nested1')
    expect(paths).not.toContain('nested1.morenested.z')
  })

  it('also handles array as paths', () => {
    const paths = extractPaths({ a: ['bla', 'ble', 'bli']})

    expect(paths).toEqual(expect.arrayContaining(['a.0', 'a.1', 'a.2']))
  })
})