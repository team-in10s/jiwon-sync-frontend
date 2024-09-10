#!/bin/bash

# 현재 디렉토리
current_dir=$(pwd)

# 'cloude-file' 디렉토리 경로
target_dir="$current_dir/cloude-file"

# 'cloude-file' 디렉토리를 비우기
rm -rf "$target_dir"
mkdir -p "$target_dir"

# 제외할 디렉토리 및 파일 목록
exclude_dirs=(".git" ".idea" "dist" "node_modules" "cloude-file" "certificates" "__pycache__" "temp" "uploads" "extention_deploy" "tests" "pytest_cache" "cache" ".next")
exclude_files=("package-lock.json" "file-change-for-claude.sh" "__init__.py" "Pipfile.lock" "CHANGELOG.md" "sequence_diagram.puml" "start.sh" "stop.sh" "dev.env" "logging.ini" "DS_Store" ".gitignore" "README" ".env")

# 제외할 파일 확장자 목록 (이미지 파일 및 PDF)
exclude_extensions=("png" "jpg" "jpeg" "gif" "bmp" "tiff" "svg" "pdf" "pem" "crx" "zip" "ico" "webp" "gz" "pack")

# 모든 파일 검색 (디렉토리 제외)
find "$current_dir" -type f | while read -r file; do
  # 파일의 절대 경로에서 현재 디렉토리 이하 부분만 추출
  relative_path="${file#"$current_dir/"}"

  # 파일이 제외할 디렉토리에 속하는지 확인
  skip_file=false
  for exclude in "${exclude_dirs[@]}"; do
    if [[ "$relative_path" == "$exclude"* ]]; then
      skip_file=true
      break
    fi
  done

  # 파일이 속한 마지막 디렉토리 추출
  parent_dir=$(basename "$(dirname "$file")")

  # 파일이 제외할 디렉토리에 속하는지 확인 (마지막 디렉토리 기준)
  for exclude in "${exclude_dirs[@]}"; do
    if [[ "$parent_dir" == "$exclude" ]]; then
      skip_file=true
      break
    fi
  done

  # 파일이 제외할 파일 목록에 있는지 확인
  for exclude_file in "${exclude_files[@]}"; do
    if [[ "$relative_path" == *"$exclude_file" ]]; then
      skip_file=true
      break
    fi
  done

  # 파일이 제외할 확장자 목록에 있는지 확인
  extension="${file##*.}"
  for exclude_ext in "${exclude_extensions[@]}"; do
    if [[ "$extension" == "$exclude_ext" ]]; then
      skip_file=true
      break
    fi
  done

  # 파일명 앞에 '.'이 있으면 제거
  if [[ "$(basename "$relative_path")" == .* ]]; then
    relative_path="${relative_path#.}"
  fi

  # 제외할 디렉토리나 파일에 속하지 않으면 파일을 복사
  if [ "$skip_file" = false ]; then
    # 상대 경로에서 디렉토리 구분자를 ':'로 변환하여 새로운 파일명 생성
    new_file_name="project:${relative_path//\//:}"

    # 파일을 'cloude-file' 디렉토리로 복사
    cp "$file" "$target_dir/$new_file_name"
  fi
done