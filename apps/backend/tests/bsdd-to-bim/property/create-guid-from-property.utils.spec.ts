import {deterministicUUID} from "../../../src/bsdd-to-bim/utils/determinisitc-id.utils";

import {  describe, expect, it } from 'vitest'

describe('deterministicUUID', () => {
    it('is deterministic', () => {
        const code = "abc"
        const guid =deterministicUUID(code)
        expect(guid).toEqual(deterministicUUID(code))
    })
})