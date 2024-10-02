type PasswordCriteriaProps = {
  criteria: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  };
};

export default function PasswordCriteria({ criteria }: PasswordCriteriaProps) {
  return (
    <ul className="mt-2 text-sm text-gray-500">
      <li className={criteria.length ? 'text-green-500' : ''}>✔️ 8자 이상</li>
      <li className={criteria.uppercase ? 'text-green-500' : ''}>✔️ 대문자 포함</li>
      <li className={criteria.lowercase ? 'text-green-500' : ''}>✔️ 소문자 포함</li>
      <li className={criteria.number ? 'text-green-500' : ''}>✔️ 숫자 포함</li>
      <li className={criteria.special ? 'text-green-500' : ''}>✔️ 특수문자 포함</li>
    </ul>
  );
}
