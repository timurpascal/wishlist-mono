import { checkOutdateDeps, checkSecurityIssue } from './security';

const ValidateObj = {
  security: {
    high: 5,
    critical: 0,
  },
  outdateDepsCount: 10,
};

@Describe('Test @mmc/common')
export class SecurityCommonPackage {
  @It('Npm security issue find')
  async securityIssue() {
    const yarnAuditData = await checkSecurityIssue();
    const security = yarnAuditData.data.vulnerabilities;
    expect(security.high).toBeLessThanOrEqual(ValidateObj.security.high);
    expect(security.critical).toBe(ValidateObj.security.critical);
  }

  @It('Npm outdate deps check')
  async npmOutdateDeps() {
    const yarnOutdateDeps = await checkOutdateDeps();
    if (yarnOutdateDeps !== true) {
      expect(yarnOutdateDeps.data.body.length).toBeLessThanOrEqual(ValidateObj.outdateDepsCount);
    } else {
      expect(true);
    }
  }
}
