/**
 * file with js utils for all project
 */

export const nameof = <T>(name: keyof T) => name;

export function serializeData(data: any, prefix?: string): string {
    const formData: string[] = [];
    Object.keys(data)
          .map((keyName: string) => {
            const value = data[keyName];
            const propName = prefix ? `${prefix}[${keyName}]` : keyName;
            if (value === undefined || value === null || value === {}) {
              return;
            }
            if (typeof value !== 'object') {
              formData.push(`${encodeURIComponent(propName)}=${encodeURIComponent(value)}`);
            } else {
              if (!Object.keys(value).length) {
                return;
              }
              formData.push(serializeData(value, propName));
            }
          });
  
    return _.compact(formData).join('&');
  }