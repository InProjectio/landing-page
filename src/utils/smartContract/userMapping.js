import web3 from './web3';

const address = process.env.REACT_APP_SMART_CONTRACT_USER_MAPPING_ADDRESS;

const abi = [{ inputs: [{ internalType: 'address', name: 'user_contract', type: 'address' }], stateMutability: 'nonpayable', type: 'constructor' }, { anonymous: false, inputs: [{ indexed: true, internalType: 'address', name: 'previousAdmin', type: 'address' }, { indexed: true, internalType: 'address', name: 'newAdmin', type: 'address' }], name: 'SuperAdminTransferred', type: 'event' }, { inputs: [{ internalType: 'string', name: 'userMappingId', type: 'string' }, { internalType: 'string', name: 'dataUserMapping', type: 'string' }], name: 'addUserMapping', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'string', name: 'userMappingId', type: 'string' }, { internalType: 'string', name: 'dataUserMapping', type: 'string' }, { internalType: 'address', name: 'sender', type: 'address' }], name: 'addUserMappingCompany', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'adminAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'string', name: 'userMappingId', type: 'string' }, { internalType: 'string', name: 'dataUserMapping', type: 'string' }], name: 'editUserMapping', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'string', name: '_userMappingId', type: 'string' }], name: 'getUserMappingDetailById', outputs: [{ internalType: 'string', name: 'userMappingId', type: 'string' }, { internalType: 'string', name: 'dataUserMapping', type: 'string' }, { internalType: 'uint256', name: 'userId', type: 'uint256' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'sender', type: 'address' }], name: 'getUserMappingId', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'newAdmin', type: 'address' }], name: 'transferAdmin', outputs: [], stateMutability: 'nonpayable', type: 'function' }]

const contract = web3 ? new web3.eth.Contract(abi, address) : null;

export default contract
