from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter(prefix='')

@router.get('/', response_class=FileResponse)
def root():
    return FileResponse('static/index.html')

@router.get('/kanji', response_class=FileResponse)
def kanji():
    return FileResponse('static/kanji.html')

@router.get('/words', response_class=FileResponse)
def words():
    return FileResponse('static/words.html')

@router.get('/video', response_class=FileResponse)
def video():
    return FileResponse('static/video.html')
