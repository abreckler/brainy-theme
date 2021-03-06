import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '../mui-override/Card';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ColorfulTag from '../utils/hash-colorful-tag'
import StateTag from '../utils/state-tag';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'gatsby'

const styles = theme => ({
    card: {
        display: 'flex',
        height: 217,
        width: 420,
        margin: '10px auto',
        position: 'relative'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        minWidth: 150,
        objectFit: 'cover',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

function notionImageResize(url, width) {
    let encodedUrl = encodeURIComponent(url)
    return `https://notion.so/image/${encodedUrl}?width=${width}`
}

function MediaControlCard(props) {

    const [open, setOpen] = React.useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }


    const { classes, theme, data: { boardsInfo, node: {
        name, comment, cover_image, source_url, author, tags
    } } } = props;

    const CSMap = {
        '在读': '#f44336',
        '已读': '#9e9e9e',
        '暂缓': '#607d8b',
        '待读': '#795548',
        '待购': '#ffc107'
    }
    const MyLink = props => <a target="_blank" href={`${source_url}`} {...props} />

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cover}
                image={notionImageResize(cover_image, 150)}
                title={name}
                author={author}
            />
            <CardActionArea component={MyLink}>

            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" onClick={handleClickOpen} >
                        {author}
                    </Typography>
                </CardContent>
            </div>
            </CardActionArea>

            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>{`${name}`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {`${comment}`}
                        </DialogContentText>
                        {
                            boardsInfo && Boolean(boardsInfo.length) && <h3>相关文章</h3>
                        }
                        {
                            boardsInfo && boardsInfo.map(item => <Link to={`${item.source_url}`}><div>{item.name}</div></Link>)
                        }
                    </DialogContent>
                </Dialog>
            </div>
        </Card>
    );
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
