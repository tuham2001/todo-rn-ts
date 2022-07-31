import uuid from 'react-native-uuid';

export const getUuid = (): string => <string>uuid.v4();
